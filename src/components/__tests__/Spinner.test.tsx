import React from 'react';
import { mount } from 'enzyme';
import { LoadingProvider } from 'providers';
import { useLoading } from 'providers/LoadingProvider';
import Spinner from '../Spinner';

describe('Render Spinner component', () => {
  it('render correctly ', () => {
    const SpinnerComponent = mount(<Spinner />);
    expect(SpinnerComponent).toMatchSnapshot();
  });

  xit('render correctly with context', () => {
    const tree = (
      <LoadingProvider>
        <Spinner />
      </LoadingProvider>
    );
    const SpinnerComponent = mount(tree);
    const { showLoading } = useLoading();
    showLoading();
    expect(SpinnerComponent).toMatchSnapshot();
  });
});
