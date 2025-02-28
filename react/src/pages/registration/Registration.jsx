import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { API } from '@/api/api';

const formSchema = z
  .object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    password_confirmation: z
      .string()
      .min(1, { message: 'Password confirmation is required' }),
    id_number: z.string().min(1, { message: 'ID number is required' }),
    first_name: z.string().min(1, { message: 'First name is required' }),
    middle_name: z.string().min(1, { message: 'Middle name is required' }),
    last_name: z.string().min(1, { message: 'Last name is required' }),
    birthday: z.date({ required_error: 'Birthday is required' }),
    course: z.string().min(1, { message: 'Course is required' }),
    contact_number: z
      .string()
      .min(1, { message: 'Contact number is required' }),
    emergency_contact: z
      .string()
      .min(1, { message: 'Emergency contact is required' }),
    emergency_contact_number: z
      .string()
      .min(1, { message: 'Emergency contact number is required' }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  });

function Registration() {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      password_confirmation: '',
      id_number: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      course: '',
      contact_number: '',
      emergency_contact: '',
      emergency_contact_number: '',
    },
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePhoto(e.target.files[0]);
    }
  };

  const onSubmit = async (e, values) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setError(null);
    setFieldErrors({});

    if (!profilePhoto) {
      setError('Profile photo is required');
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (key === 'birthday') {
          formData.append(key, format(value, 'yyyy-MM-dd'));
        } else {
          formData.append(key, value);
        }
      });

      formData.append('profile_photo', profilePhoto);

      await API.register(formData);

      setSuccess(true);

      window.scrollTo({ top: 0, behavior: 'smooth' });

      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      const errors = err.errors;
      setFieldErrors(errors);
      const firstErrorKey = Object.keys(errors)[0];
      setError(errors[firstErrorKey].join(', '));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getServerErrors = (fieldName) => {
    return fieldErrors[fieldName] ? fieldErrors[fieldName].join(', ') : null;
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Student Registration
          </CardTitle>
          <CardDescription>
            Create a new student account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert
              variant="destructive"
              className="mb-6 flex w-full justify-center"
            >
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
              <AlertDescription>
                Registration successful! Redirecting to login...
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Juan" {...field} />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.first_name?.message ||
                          getServerErrors('first_name')}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="middle_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ton" {...field} />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.middle_name?.message ||
                          getServerErrors('middle_name')}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Dela Cruz" {...field} />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.last_name?.message ||
                          getServerErrors('last_name')}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="id_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="12345678" {...field} />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.id_number?.message ||
                          getServerErrors('id_number')}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.email?.message ||
                          getServerErrors('email')}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Birthday *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={`w-full pl-3 text-left font-normal ${!field.value ? 'text-muted-foreground' : ''}`}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage>
                        {form.formState.errors.birthday?.message ||
                          getServerErrors('birthday')}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course *</FormLabel>
                      <FormControl>
                        <Input placeholder="Computer Science" {...field} />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.course?.message ||
                          getServerErrors('course')}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contact_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="+1234567890" {...field} />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.contact_number?.message ||
                          getServerErrors('contact_number')}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emergency_contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact *</FormLabel>
                      <FormControl>
                        <Input placeholder="Maria Clara" {...field} />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.emergency_contact?.message ||
                          getServerErrors('emergency_contact')}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emergency_contact_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="+1234567890" {...field} />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.emergency_contact_number
                          ?.message ||
                          getServerErrors('emergency_contact_number')}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password *</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormDescription>
                        Password must be at least 8 characters long
                      </FormDescription>
                      <FormMessage>
                        {form.formState.errors.password?.message ||
                          getServerErrors('password')}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password *</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.password_confirmation?.message ||
                          getServerErrors('password_confirmation')}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Label htmlFor="profile_photo">Profile Photo *</Label>
                  <Input
                    id="profile_photo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                  {profilePhoto && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">
                        Selected: {profilePhoto.name}
                      </p>
                    </div>
                  )}
                  {!profilePhoto && form.formState.isSubmitted && (
                    <p className="text-sm text-red-500 mt-1">
                      Profile photo is required
                    </p>
                  )}
                  {getServerErrors('profile_photo') && (
                    <p className="text-sm text-red-500 mt-1">
                      {getServerErrors('profile_photo')}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full text-black disabled:text-gray-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  'Register'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Return to Login
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Registration;
