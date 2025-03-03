import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { API } from '@/api/api';
import Cookies from 'js-cookie';
import { MdErrorOutline } from 'react-icons/md';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [credentials, setCredentials] = useState({
    login: '',
    password: '',
  });

  useEffect(() => {
    const authToken = Cookies.get('Authorization');
    if (authToken) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await API.login({ user: credentials });
      const authToken = response.data.token;
      Cookies.set('Authorization', authToken);

      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setError('Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegistration = () => {
    navigate('/register');
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md border-2 border-red-100">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <img src="/ublogo.png" alt="Logo" className="w-32 h-32" />
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Login to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsContent value="login">
              <form className="space-y-2" onSubmit={handleLogin}>
                {error && (
                  <div className="text-red-500 text-center flex items-center gap-1 justify-center">
                    <MdErrorOutline />
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="login">Email or ID Number</Label>
                  <Input
                    id="login"
                    placeholder="Enter your email or ID number"
                    value={credentials.login}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button
                      variant="link"
                      className="px-0 font-normal text-sm"
                      onClick={handleRegistration}
                      type="button"
                    >
                      Register
                    </Button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full text-white bg-red-700 hover:bg-red-500 duration-300 ease-in-out cursor-pointer"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;