import { useState } from "react";
import type { TUserFull } from "../features/user/user.interface";
import { useAuthStore } from "../features/auth/store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  LockKeyhole,
  Mail,
  Rocket,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<TUserFull>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { register: signUp, isSigningUp } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signUp(formData);
  };

  return (
    <div className="min-h-screen grid lg: grid-cols-1">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Rocket className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create an Account</h1>
              <p className="text-base-content/60">Start Fresh</p>
            </div>
          </div>
          {/* Form */}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <div className="inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <span className="label-text font-medium">Username</span>
              </label>
              <div>
                <input
                  type="text"
                  className={`input input-bordered w-full`}
                  placeholder="username"
                  value={formData.userName}
                  onChange={(e) =>
                    setFormData({ ...formData, userName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <div className="inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <span className="label-text font-medium">Email</span>
              </label>
              <div>
                <input
                  type="email"
                  className={`input input-bordered w-full`}
                  placeholder="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <div className="inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pr-10`}
                  placeholder="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className=" absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <div className="inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockKeyhole className="size-5 text-base-content/40" />
                </div>
                <span className="label-text font-medium">Confirm Password</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`input input-bordered w-full pr-10`}
                  placeholder="confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  className=" absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create an Account"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?
              <Link to="/login" className="link link-primary pl-1">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
