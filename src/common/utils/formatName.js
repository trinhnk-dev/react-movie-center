export const formatName = (name) => {
  let newName = name.trim();
  for (let i = newName.length; i > 0; i--) {
    if (newName[i] === " ") {
      return newName.slice(i + 1, newName.length);
    }
  }
  return newName;
};

// toUpperCase Name -- in hoa ki tu dau tien
export const upperCaseFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
