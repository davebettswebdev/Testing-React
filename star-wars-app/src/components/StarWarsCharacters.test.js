import React from 'react';
import {render, fireEvent, wait, findAllByTestId} from '@testing-library/react';
import StarWarsCharacters from "./StarWarsCharacters";
import {getData as mockGetData} from '../api'
import "@testing-library/jest-dom"

jest.mock("../api")

test('buttons fire and and call correct functions', async () =>{
  mockGetData.mockResolvedValueOnce(
    {results: [{
      name: "Luke"
    }],
    next:"Test",
    previous:"Test"
    }
  );
  const { findByText, getByText} = render(<StarWarsCharacters/>);
  const nextButton = getByText(/next/i);
  const prevButton = getByText(/previous/i);
  fireEvent.click(nextButton);
  fireEvent.click(prevButton);
  expect(mockGetData).toHaveBeenCalledTimes(1);
  await wait(() => expect(getByText(/Luke/i)));
})

// test('app renders without crashing', () => {
//     render(<StarWarsCharacters />);
//   });

// test ('buttons renders without crashing',  () => {

//     const { getByText } = render(<StarWarsCharacters />);

//     getByText(/next/i);
//     getByText(/previous/i);

// })



