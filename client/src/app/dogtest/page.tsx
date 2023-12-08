'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

function Dog() {
  let [dogImage, setDogImage] = useState('https://flipanim.com/gif/j/t/jtQPUtMy.gif');
  let [dogBreed, setDogBreed] = useState('LOADING, NO DOG YET');

  function getDogBreed(dogLink: string) {
    const splitted = dogLink.split('/');
    return splitted[4]
  }

  async function newDog() {
    try {
      setDogBreed('LOADING, FETCHING NEW DOG...');
      setDogImage('https://flipanim.com/gif/j/t/jtQPUtMy.gif');

      const response = await fetch('https://dog.ceo/api/breeds/image/random');

      if (!response.ok) {
        throw new Error('booo idk');
      }

      const data = await response.json();
      console.log(data);

      setDogBreed('dog breed is: ' + getDogBreed(data.message));
      setDogImage(data.message);
    } catch (error) {
      console.log(error);
      setDogBreed('ERROR OCCURRED');
      setDogImage('https://cdn5.vectorstock.com/i/1000x1000/69/99/no-dog-sign-vector-1516999.jpg');
    }
  }

  useEffect(() => {
    newDog();
  }, []);


  return (
    <main className='h-screen w-screen'>
      <div className='flex flex-col '>
        <div className='text-center mb-3 font-bold '>
          {dogBreed}
        </div>
        <div className='m-auto'>
          {dogImage && <img className='rounded-xl' src={dogImage} width={"300px"} height={"300px"} />}
        </div>
        <div className='m-auto mt-3'>
          <Button className='' variant={'destructive'} onClick={newDog}>
            Generate new dog!!
          </Button>
        </div>
      </div>
    </main>
  )
}

export default Dog;