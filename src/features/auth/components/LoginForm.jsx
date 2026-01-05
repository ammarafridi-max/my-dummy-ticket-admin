import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useLogin } from '../hooks/useLogin';
import PrimaryButton from '../../../components/PrimaryButton';
import Input from '../../../components/FormElements/Input';
import Label from '../../../components/FormElements/Label';

export default function LoginForm() {
  const navigate = useNavigate();
  const { login, isLoggingIn } = useLogin();
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    login({ email, password });
  }

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="bg-white backdrop-blur-md border border-white/20 shadow-md rounded-2xl w-[400px] p-10 text-white">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoggingIn}
              placeholder="Enter your email"
              className="bg-white text-gray-900 error:border-red-500"
            />
          </div>

          <div>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoggingIn}
              placeholder="Enter your password"
              className="bg-white text-gray-900"
            />
          </div>

          <PrimaryButton
            type="submit"
            disabled={isLoggingIn}
            className="w-full mt-2 py-3 bg-[#FF6B00] hover:bg-[#e66000] text-white font-semibold rounded-lg transition-all duration-200"
          >
            {isLoggingIn ? 'Signing in…' : 'Login'}
          </PrimaryButton>
        </form>

        <p className="text-xs text-gray-400 text-center mt-8">
          © {new Date().getFullYear()} My Dummy Ticket. All rights reserved.
        </p>
      </div>
    </div>
  );
}
