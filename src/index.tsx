import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';

const Component = React.lazy(() => import('./Component').then((c) => c))

ReactDOM.render(<Suspense fallback={null}><Component/></Suspense>, document.querySelector('#root'));
