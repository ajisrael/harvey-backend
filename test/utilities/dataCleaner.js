const removeSqlFields = (dbData) => {
  dbData.forEach((entry) => {
    delete entry.id;
    delete entry.created_at;
  });

  return dbData;
};

export { removeSqlFields };
