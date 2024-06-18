export default function validation(values, isSignup) {
    const errors = {};
    const email_pattern = /^[^\s@]+@gmail\.com$/;
    const password_Pattern = /^.{6,}$/;
  
    if (isSignup) {
      if (values.username === "") {
        errors.username = "Please enter name";
      }
    }
  
    if (values.email === "") {
      errors.email = "Please enter email";
    } else if (!email_pattern.test(values.email)) {
      errors.email = "Please enter a valid email";
    }
  
    if (values.password === "") {
      errors.password = "Please enter password";
    } else if (!password_Pattern.test(values.password)) {
      errors.password = "Password should be at least 6 characters";
    }
  
    return errors;
  }
  