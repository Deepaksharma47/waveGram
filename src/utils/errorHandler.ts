class AppError extends Error {
    statusCode: number; // Status code of the error
  
    constructor(message: string, statusCode: number = 500) {
      super(message);
      Object.setPrototypeOf(this, AppError.prototype); // Ensure prototype chain is preserved
      this.name = this.constructor.name; // Set the error name to the class name
      this.statusCode = statusCode;
    }
  }
  
  export { AppError };
  