import React from 'react';

function normalized(string) {
  return string.trim() ? string.toLowerCase().trim() : '';
}

export const getUsersWithQuery = ({
  users,
  query,
  order,
}) => {
  let preparedUsers = users;

  if (query) {
    const normalizedQuery = normalized(query);

    preparedUsers = preparedUsers.filter(user => {
      const normalizedName = normalized(user.name);

      return normalizedName.includes(normalizedQuery);
    });
  }

  preparedUsers = [...preparedUsers].sort((u1, u2) => (
    u1.name.localeCompare(u2.name)),
  );

  if (order === 'descend') {
    preparedUsers.reverse();
  }

  return preparedUsers;
};

