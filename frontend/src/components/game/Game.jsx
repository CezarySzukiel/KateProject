import { useDispatch } from 'react-redux';
import { setNavbarDisplay } from '../../actions/layoutActions'

export function Game() {
    const dispatch = useDispatch()
    dispatch(setNavbarDisplay(false))
    
	return (
    	<div className={'GameContainer'}>
        	<h1>Page in build</h1>
        </div>
    );
}