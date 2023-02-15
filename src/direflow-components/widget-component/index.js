import { DireflowComponent } from 'direflow-component';
import App from './App';

const component = document.querySelector('widget-component');
// console.log('component main', component)
const id = component.getAttribute('data-id')
// console.log('component main 2', component.getAttribute('question'))

export default DireflowComponent.create({
  component: App,
  configuration: {
    tagname: 'widget-component'
  },
  properties: {
    componentTitle: 'Jobshot Widget',
    dataId: id
  },
  plugins: [
    {
      name: 'font-loader',
      options: {
        google: {
          families: ['Advent Pro', 'Noto Sans JP'],
        },
      },
    },
  ],
});
