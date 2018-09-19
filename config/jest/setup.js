import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

Enzyme.configure({ adapter: new Adapter() });
global.mockStore = configureMockStore([thunk]);
