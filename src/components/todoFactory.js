function todoFactory(title, description, dueDate, isPriority, isComplete) {
  return {
    title,
    description,
    dueDate,
    isPriority,
    isComplete,
  };
}

export { todoFactory };
