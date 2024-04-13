import { useState } from "react";
import { Box, VStack, Heading, Text, Button, Select, Link } from "@chakra-ui/react";

const Index = () => {
  const [data, setData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  // Custom CSV parsing function
  const customParse = (csv) => {
    const lines = csv.split("\n");
    const headers = lines[0].split(",").map((h) => h.trim());
    const data = lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.trim());
      return headers.reduce((obj, key, i) => ({ ...obj, [key]: values[i] }), {});
    });
    return data;
  };

  const parseCSV = (file) => {
    try {
      const data = customParse(file);

      const filtered = data.filter((d) => d.type === "ai_update");
      setData(filtered);
    } catch (err) {
      console.error("CSV parsing error:", err);
      alert("Error parsing CSV file");
    }
  };

  // Handle file upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      parseCSV(event.target.result);
    };
    reader.readAsText(file);
  };

  // Get unique project IDs
  const uniqueProjects = [...new Set(data.map((d) => d.project_id))];

  // Filter data by selected project
  const filteredData = selectedProject ? data.filter((d) => d.project_id === selectedProject) : data;

  // Sort by created_at date
  const sortedData = filteredData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <Box maxW="960px" mx="auto" p={4}>
      <Heading mb={8}>CSV Upload and Processing</Heading>

      {/* File upload */}
      <Heading size="md" mb={2}>
        Upload CSV File
      </Heading>
      <input type="file" onChange={handleUpload} />

      {data.length > 0 && (
        <VStack align="stretch" mt={8}>
          {/* Project selector */}
          <Heading size="md" mb={2}>
            Select Project
          </Heading>
          <Select placeholder="All Projects" value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
            {uniqueProjects.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </Select>

          {/* Edit list */}
          {sortedData.map((edit) => (
            <Box key={edit.id} p={4} border="1px" borderColor="gray.200">
              <Heading size="sm">Edit {edit.id}</Heading>
              <Text>
                Commit:{" "}
                <Link href={`https://github.com/search?q=commit%3A${edit.commit_sha}&type=commits`} isExternal>
                  {edit.commit_sha}
                </Link>
              </Text>

              {/* Gracefully parse tags.output JSON */}
              <Box mt={4}>
                <Heading size="sm">Output</Heading>
                {(() => {
                  try {
                    const output = JSON.parse(edit.tags.output);
                    return <pre>{JSON.stringify(output, null, 2)}</pre>;
                  } catch (err) {
                    console.error(`Error parsing tags.output for edit ${edit.id}:`, err);
                    return <Text color="red.500">Invalid JSON in tags.output</Text>;
                  }
                })()}
              </Box>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default Index;
