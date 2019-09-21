import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import { ContractsTree } from '../ContractsTree';



describe('Uploader', () => {
  test('uploads file', async () => {
    const rows = ['NAME,ADDRESS,ZIP', 'james,1800 sunny ln,40000', 'ronda,1200 peaches ln,50000'];
    const file = new File([rows.join('\n')], 'some.sol');

    const { getByText, getByTestId, container, getByTitle } = render(
      <ContractsTree 
        contracts={[{
          name: 'test',
          sourceCode: "test",
          abi: [],
          bytecode: "test",
        }]}
      />
      );
    
    const formElement = getByTestId('single-file-upload');
    Object.defineProperty(formElement, 'files', { value: [file] });
    
    expect(fireEvent.click(formElement)).toBe(true);
  })

  test('uploads file', async () => {
    const rows = ['NAME,ADDRESS,ZIP', 'james,1800 sunny ln,40000', 'ronda,1200 peaches ln,50000'];
    const file = new File([rows.join('\n')], 'some.sol');

    const { getByText, getByTestId, container, getByTitle } = render(
      <ContractsTree 
        contracts={[{
          name: 'test',
          sourceCode: "test",
          abi: [],
          bytecode: "test",
        }]}
      />
      );
    
    const formElement = getByTestId('folder-file-upload');
    Object.defineProperty(formElement, 'files', { value: [file] });
    
    expect(fireEvent.click(formElement)).toBe(true);
  })
})