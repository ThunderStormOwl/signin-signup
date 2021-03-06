import React, { createContext, useCallback, useEffect, useState } from 'react';

interface IThemeContextData {

    toggleDarkMode: (value?: boolean) => void;
    isDark: boolean;

}

export const ThemeContext = createContext<IThemeContextData>({} as IThemeContextData);

export const ThemeProvider: React.FC = ({ children }) => {

    const [isDark, setIsDark] = useState(false);

    useEffect(()=>{
        if(isDark){

            document.documentElement.style.setProperty('--color-background-paper', '#3a3a3a')
            document.documentElement.style.setProperty('--color-background', '#1b1b1b')
            document.documentElement.style.setProperty('--color-border', '#fafafa')
            document.documentElement.style.setProperty('--color-text', '#fafafa')
            document.documentElement.style.setProperty('--color-primary', '#ec1414')
            document.documentElement.style.setProperty('--color-input-background', '#ec1414')
            document.documentElement.style.setProperty('--color-placeholder', '#ffffff7e')
            document.documentElement.style.setProperty('--button-text-color', '#ec1414')
            
        }
        else{

            document.documentElement.style.setProperty('--color-background-paper', '#fafafa')
            document.documentElement.style.setProperty('--color-background', '#f0f2f5')
            document.documentElement.style.setProperty('--color-border', '#afafaf')
            document.documentElement.style.setProperty('--color-text', '#000000')
            document.documentElement.style.setProperty('--color-primary', '#fb1b1b')
            document.documentElement.style.setProperty('--color-input-background', '#e4e4e4')
            document.documentElement.style.setProperty('--color-placeholder', '#0000007e')
            document.documentElement.style.setProperty('--button-text-color', '#000000')

        }
    }, [isDark]);

    const toggleDarkMode = useCallback((value?: boolean) => {

        if(value === undefined){
            setIsDark(!isDark);
        }
        else{
            setIsDark(value);
        }

    }, [isDark])

    return(
        <ThemeContext.Provider value={{isDark, toggleDarkMode}}>
            {children}
        </ThemeContext.Provider>
    );

}