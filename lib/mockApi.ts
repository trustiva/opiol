/**
 * Simulates a POST request to an API endpoint with realistic behavior
 * @param data The data to be sent to the API
 * @returns Promise that resolves with success response or rejects with error
 */
export async function simulateApiPost<T>(data: T): Promise<{ success: boolean; message: string }> {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      // Randomly fail 30% of the time
      const shouldFail = Math.random() < 0.3;

      if (shouldFail) {
        reject({
          success: false,
          message: 'Server error. Please try again.'
        });
        return;
      }

      // Log the data in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Mock API received:', data);
      }

      resolve({
        success: true,
        message: 'Submission successful!'
      });
    }, 1500); // 1.5 second delay
  });
}

/**
 * Simulates a GET request to an API endpoint
 * @param endpoint The API endpoint to fetch from
 * @returns Promise that resolves with mock data or rejects with error
 */
export async function simulateApiGet<T>(endpoint: string): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.3;

      if (shouldFail) {
        reject({
          success: false,
          message: 'Failed to fetch data. Please try again.'
        });
        return;
      }

      // Return mock data based on endpoint
      resolve({} as T);
    }, 1500);
  });
}

/**
 * Simulates a PUT request to update data
 * @param endpoint The API endpoint to update
 * @param data The data to update
 * @returns Promise that resolves with success response or rejects with error
 */
export async function simulateApiPut<T>(
  endpoint: string,
  data: T
): Promise<{ success: boolean; message: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.3;

      if (shouldFail) {
        reject({
          success: false,
          message: 'Failed to update data. Please try again.'
        });
        return;
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('Mock API updated:', { endpoint, data });
      }

      resolve({
        success: true,
        message: 'Update successful!'
      });
    }, 1500);
  });
}

/**
 * Simulates a DELETE request
 * @param endpoint The API endpoint to delete from
 * @returns Promise that resolves with success response or rejects with error
 */
export async function simulateApiDelete(
  endpoint: string
): Promise<{ success: boolean; message: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.3;

      if (shouldFail) {
        reject({
          success: false,
          message: 'Failed to delete. Please try again.'
        });
        return;
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('Mock API deleted:', endpoint);
      }

      resolve({
        success: true,
        message: 'Deletion successful!'
      });
    }, 1500);
  });
} 