
//Generic error class for tasty trials
export default class TastyTrialsError extends Error {
    
    constructor(message) {
      // Calling the constructor of the parent class (Error)
      super(message);
  
      // Ensuring that the correct prototype chain is maintained
      Object.setPrototypeOf(this, TastyTrialsError.prototype);
    }
}