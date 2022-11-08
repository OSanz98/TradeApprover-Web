import {useState, useEffect} from 'react-redux';


function getWindowDimensions(){
    const { innerWidth: width, innerHeight: height } = window;
    return{
        width,
        height
    };
};

export default function useWindowDimensions(){
    const [ windowSize, setWindowSize ] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize(){
            setWindowSize(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}