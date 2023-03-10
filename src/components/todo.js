function todoFactory(title, description, dueDate, priority, isComplete) {
  return {
    title,
    description,
    dueDate,
    priority,
    isComplete,
  };
}

export { todoFactory };
