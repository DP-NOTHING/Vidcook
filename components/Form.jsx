"use client"
import { useRef } from 'react';
import { FileInput, Box } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export function DropzoneButton() {
  const [value, setValue] = useState(null);
  const navigate = useNavigate();

  return (
    <Box >
      <FileInput
        size="lg"
        label="Input label"
        description="Input description"
        placeholder="Input placeholder"
        onChange={fun} />
    </Box>
  );
}