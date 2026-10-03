export const dateIsFormatted = (date: string) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (date.match(regex) === null) {
    return false;
  }
  return true;
}

export const dateIsNotInFuture = (date: string): boolean => {
    const formattedDate = new Date (date)
    const timestamp = formattedDate.getTime();
    const validDate = !Number.isNaN(timestamp);

    if (validDate && formattedDate < new Date(Date.now())) {
        return true;
    } else {
        return false;
    }
}

