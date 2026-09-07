export interface GalleryImage {
  id: string
  src: string
  alt: string
  title: string
  description: string
  width: number
  height: number
}

// Original source order; these photos are not claims of current listing availability.
// Exact source URLs are recorded in docs/source-assets.json.
export const gallery: readonly GalleryImage[] = [
  {
    id: 'gallery-01',
    src: '/images/gallery-01.jpg',
    width: 1024,
    height: 682,
    alt: 'Aerial view of a neighborhood around a lake and golf course, with mountains beyond.',
    title: 'Desert community',
    description: 'An elevated view across a Pahrump neighborhood, with water, golf-course greens and the surrounding mountain landscape in the distance.',
  },
  {
    id: 'gallery-02',
    src: '/images/gallery-02.jpg',
    width: 1024,
    height: 682,
    alt: 'Sunroom with a red armchair and large windows looking onto a desert garden.',
    title: 'Indoor-outdoor light',
    description: 'A bright interior framed by generous windows, bringing the desert garden and natural Nevada light into the room.',
  },
  {
    id: 'gallery-03',
    src: '/images/gallery-03.jpg',
    width: 1024,
    height: 682,
    alt: 'Aerial view of a single-story home and driveway against a mountain backdrop.',
    title: 'Mountain-framed home',
    description: 'A single-story residence set into the valley, with a broad driveway and the mountains establishing a distinctly Pahrump sense of place.',
  },
  {
    id: 'gallery-04',
    src: '/images/gallery-04.jpg',
    width: 1024,
    height: 682,
    alt: 'Aerial view of a tiled-roof home with a backyard pool and surrounding desert.',
    title: 'Poolside living',
    description: 'A desert home seen from above, where the tiled roof, private pool and open surroundings create a relaxed residential setting.',
  },
  {
    id: 'gallery-05',
    src: '/images/gallery-05.jpg',
    width: 1024,
    height: 682,
    alt: 'Community recreation grounds with sports courts and a roundabout below the mountains.',
    title: 'Community amenities',
    description: 'Recreation grounds and neighborhood amenities sit below the mountain horizon, showing another side of everyday life in the valley.',
  },
  {
    id: 'gallery-06',
    src: '/images/gallery-06.jpg',
    width: 1024,
    height: 683,
    alt: 'Aerial view of blue and green sports courts beside community buildings.',
    title: 'Active community',
    description: 'Sports courts and nearby community buildings add a more active, social layer to the Pahrump residential landscape.',
  },
  {
    id: 'gallery-07',
    src: '/images/gallery-07.jpg',
    width: 1024,
    height: 683,
    alt: 'Single-story homes bordering a golf course and pond in the desert valley.',
    title: 'Golf-course setting',
    description: 'Single-story homes line the golf course and pond, balancing open desert views with a greener neighborhood setting.',
  },
]
