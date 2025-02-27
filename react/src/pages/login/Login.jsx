import { useState } from 'react';
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
import { UserRoundPlus } from 'lucide-react';
import { API } from '@/api/api';
import Cookies from 'js-cookie';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [credentials, setCredentials] = useState({
    login: '',
    password: '',
  });

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
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-20 h-20 mb-2 flex items-center justify-center bg-primary/10 rounded-full">
            <UserRoundPlus className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Login to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsContent value="login">
              <form className="space-y-4 mt-5" onSubmit={handleLogin}>
                {error && (
                  <div className="text-red-500 text-center">{error}</div>
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
                  className="w-full text-black"
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
