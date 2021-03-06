import React, { useCallback, useState } from 'react';
import './Signin.css';
import {Button} from '../../shared/components/Button';
import {Link, useHistory} from 'react-router-dom';
import{DarkModeCheckbox} from '../../shared/components/DarkModeCheckbox';
import {SigninService} from '../../shared/services/signin-service/SigninService';

export const Signin: React.FC = () => {

    const history = useHistory();

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[keepConnected, setKeepConnected] = useState(false);
    const[isLoading, setIsloading] = useState(false);

    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsloading(true);
        const result =  await SigninService.signIn(email, password);
        setIsloading(false);

        if(result.sucess){
            history.push('/dashboard');
        }
        else{
            if(!result.messages || result.messages.length === 0){
                alert('Log in error!');
            }
            else{
                alert(result.messages.join(',/n'));
            }
        }
    }, [email, password, history]);
    
    return(
        <div className="signin-base flex-content-center flex-items-center">
            <div className="padding-g shadow-m border-red border-radius-soft flex-column flex-items-center background-paper">
                <h2 className="font-size-xxg font-weight-m">Log in</h2>
                <div className="margin-top-m">
                    <form 
                        className="flex-column login-form"
                        onSubmit={handleSubmit}
                    >

                            <input
                                disabled={isLoading}
                                className="padding-m font-size-m" 
                                placeholder="Email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        
                            <input
                                minLength={2}
                                disabled={isLoading}
                                className="padding-m font-size-m margin-top-s" 
                                placeholder="Password"
                                type="password"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <label className="font-size-m margin-top-s padding-top-s padding-bottom-m display-flex flex-items-center">
                                <input
                                    disabled={isLoading}
                                    className="margin-right-s"
                                    type="checkbox"
                                    checked={keepConnected}
                                    onChange={(e) => setKeepConnected(!keepConnected)}
                                />
                                Stay logged in
                            </label>
                            

                            <Button disabled={isLoading}>Log In</Button>
                    </form>
                    
                </div>
                {isLoading? 
                <p className="font-size-m margin-top-m font-weight-g">
                Sign Up
                </p> : 
                <Link to="/signup" className="font-size-m margin-top-m font-weight-g">
                Sign Up
                </Link>}
            </div>

            <DarkModeCheckbox/>

        </div>
    );

}