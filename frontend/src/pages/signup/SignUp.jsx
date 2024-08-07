import { useState } from 'react';
import GenderCheckbox from './GenderCheckbox';
import { Link } from 'react-router-dom';
import useSignUp from '../../hooks/useSignup';

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: '',
    });

    const { loading, signup } = useSignUp();

    const handleCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8'>
            <div className="p-6 shadow-md w-full max-w-md bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
                <h1 className='text-3xl font-semibold text-center text-gray-300 mb-4'>
                    Sign Up <span className='text-blue-500'>ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className='block text-base label-text mb-2'>
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder='Enter Full Name'
                            className='w-full h-10 input input-bordered'
                            value={inputs.fullName}
                            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                        />
                    </div>

                    <div className="mb-4">
                        <label className='block text-base label-text mb-2'>
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder='Enter Username'
                            className='w-full h-10 input input-bordered'
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </div>

                    <div className="mb-4">
                        <label className='block text-base label-text mb-2'>
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder='Enter Password'
                            className='w-full h-10 input input-bordered'
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>

                    <div className="mb-4">
                        <label className='block text-base label-text mb-2'>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder='Enter Confirm Password'
                            className='w-full h-10 input input-bordered'
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                        />
                    </div>

                    <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

                    <Link to='/login' className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
                        Already have an account?
                    </Link>

                    <div className="mt-4">
                        <button className='btn btn-block btn-sm' type="submit" disabled={loading}>
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
