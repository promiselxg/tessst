export async function retryOperation(fn, maxAttempts = 3, delayMs = 500) {
  let attempt = 1;
  while (attempt <= maxAttempts) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxAttempts) {
        throw error;
      }
      console.warn(`Attempt ${attempt} failed. Retrying in ${delayMs}ms...`);
      await new Promise((res) => setTimeout(res, delayMs));
      attempt++;
    }
  }
}
