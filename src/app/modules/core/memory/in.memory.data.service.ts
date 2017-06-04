import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let heroes = [
      {
         id: 11, 
         name: 'Black Panther', 
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/angular4hero.appspot.com/o/bl_panther_sm.jpeg?alt=media&token=d9fe1f0e-b968-4835-be01-07ba3c43e100',
        coverPicUrl: 'https://firebasestorage.googleapis.com/v0/b/angular4hero.appspot.com/o/bl_panther_lg.jpeg?alt=media&token=9b6944c8-8045-4183-8fcb-bfbbc8cc8500' 
      },
      {
          id: 12, 
          name: 'Daredevil', 
          imageUrl: 'https://firebasestorage.googleapis.com/v0/b/angular4hero.appspot.com/o/daredevil_sm.jpeg?alt=media&token=aa7aaffa-06db-4766-9bf3-447a90e2d74f',
          coverPicUrl: 'https://firebasestorage.googleapis.com/v0/b/angular4hero.appspot.com/o/daredevil_lg.jpeg?alt=media&token=71de03c8-b64c-4e6a-afc1-7876dc1e49e3'
      },
      {
          id: 13, 
          name: 'Deadpool', 
          imageUrl: 'https://firebasestorage.googleapis.com/v0/b/angular4hero.appspot.com/o/deadpool_sm.jpeg?alt=media&token=10beec86-bb24-40d4-be73-b441b0bc02d3',
          coverPicUrl: 'https://firebasestorage.googleapis.com/v0/b/angular4hero.appspot.com/o/deadpool_lg.jpeg?alt=media&token=378e758d-a2b4-47c4-a485-aab07a016547'
      },
      {
          id: 14, 
          name: 'Dr Strange', 
          imageUrl: 'https://firebasestorage.googleapis.com/v0/b/angular4hero.appspot.com/o/dr_strange_sm.jpeg?alt=media&token=d6c6f2c3-22e7-42b1-87e5-d41a9beca2e7',
          coverPicUrl: 'https://firebasestorage.googleapis.com/v0/b/angular4hero.appspot.com/o/drstrange_lg.jpeg?alt=media&token=2ed4866e-dade-4e87-b8c2-cca25729057d'
      },
      {  
          id: 15, 
          name: 'Hawkeye', 
          imageUrl: 'https://firebasestorage.googleapis.com/v0/b/angular4hero.appspot.com/o/hawkeye_sm.jpeg?alt=media&token=a86f07f1-0dbb-44c2-bb58-c42af1249287',
          coverPicUrl: 'https://firebasestorage.googleapis.com/v0/b/angular4hero.appspot.com/o/hawkeye_lg.jpeg?alt=media&token=66ce665a-669f-430a-83a6-392eda73b52e'
      },
      {
          id: 16, 
          name: 'Hulk', 
          imageUrl: 'https://firebasestorage.googleapis.com/v0/b/angular4hero.appspot.com/o/hulk_sm.jpeg?alt=media&token=ae0935ea-076b-464b-b0c3-8580d6f33a9f',
          coverPicUrl: 'https://firebasestorage.googleapis.com/v0/b/angular4hero.appspot.com/o/hulk_lg.jpeg?alt=media&token=eedc999e-0b46-4bbc-9b0c-ef00ff726d46'
      },
      {
          id: 17, 
          name: 'Iron Man', 
          imageUrl: 'https://firebasestorage.googleapis.com/v0/b/angular4hero.appspot.com/o/ironman_sm.jpeg?alt=media&token=ae593c84-1759-4a01-9afb-410155a6466c',
          coverPicUrl: 'https://firebasestorage.googleapis.com/v0/b/angular4hero.appspot.com/o/ironman_lg.jpeg?alt=media&token=271963e7-44bb-4be5-aa40-b61a2df005f9'
      },
      {
          id: 18, 
          name: 'Spider-Man', 
          imageUrl: 'https://firebasestorage.googleapis.com/v0/b/angular4hero.appspot.com/o/spider_sm.jpeg?alt=media&token=1683b422-55cc-42cf-acfc-a81565e3964d',
          coverPicUrl: 'https://firebasestorage.googleapis.com/v0/b/angular4hero.appspot.com/o/spider_lg.jpeg?alt=media&token=2666460d-2642-42cd-babb-5736672e7560'
      },
      {
          id: 19, 
          name: 'Thor', 
          imageUrl: 'https://firebasestorage.googleapis.com/v0/b/angular4hero.appspot.com/o/thor_sm.jpeg?alt=media&token=ddbd15c3-e324-4140-9655-3157cc81bc83',
          coverPicUrl: 'https://firebasestorage.googleapis.com/v0/b/angular4hero.appspot.com/o/thor_lg.jpeg?alt=media&token=2e3632f1-b590-4f45-ac67-f02a5f98866a'
      }
    ];
    return {heroes};
  }
}