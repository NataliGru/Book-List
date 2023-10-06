import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { addBook } from '../api/books';

interface FormData {
  title: string;
  author: string;
  category: string;
  isbn: string;
}

const initialFormData: FormData = {
  title: '',
  author: '',
  category: '',
  isbn: '',
};

export function BookManagement() {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Відправка даних на сервер та очищення форми
      await addBook(formData);
      setFormData(initialFormData);

      console.log('Book added successfully');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Book title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Author name"
        name="author"
        value={formData.author}
        onChange={handleInputChange}
        required
      />
      <FormControl required>
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={formData.category}
          onChange={(e: SelectChangeEvent<string>) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
          }}
        >
          <MenuItem value="Fiction">Fiction</MenuItem>
          <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
          <MenuItem value="Science">Science</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="ISBN"
        name="isbn"
        type="text"
        value={formData.isbn}
        onChange={handleInputChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Add a Book
      </Button>
    </form>
  );
}
