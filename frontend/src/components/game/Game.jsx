import { useDispatch } from 'react-redux';
import { setSidebarDisplay } from '../../actions/layoutActions'

export function Game() {
    const dispatch = useDispatch()
    dispatch(setSidebarDisplay(false))
    
	return (
    	<div className={'GameContainer'}>
        	<h1>Page in build</h1>
        </div>
    );
}