import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Input, Stack, Heading, Center, Container } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { PasswordInput } from "../components/ui/password-input";

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: {errors} } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem('isLogined', true);
    navigate('/');
  };

  return (
    <Container minH="100vh">
      <Center minH="100vh" gap="4" flexDirection="column">
        <Heading as="h1">Sign In</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap='4' maxW="sm">
            <Field
              label="Email"
              invalid={errors.email?.message}
              errorText={errors.email?.message}
            >
              <Input {...register("email", {
                required: "This is required", 
                pattern: { 
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 
                  message: "Invalid email address" 
                }})}
              />
            </Field>
            <Field
              label="Password"
              invalid={errors.password?.message}
              errorText={errors.password?.message}
            >
              <PasswordInput {...register("password", {
                required: "This is required", 
                minLength: { 
                  value: 5, 
                  message: "Min lenght is 5" 
                }})}
              />
            </Field>
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </Center>
    </Container>
  )
}

export default LoginPage;