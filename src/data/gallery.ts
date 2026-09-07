export interface GalleryImage {
  id: string
  src: string
  alt: string
  width: number
  height: number
}

// Original source order; these photos are not claims of current listing availability.
// Exact source URLs are recorded in docs/source-assets.json.
export const gallery: readonly GalleryImage[] = [
  { id: 'gallery-01', src: '/images/gallery-01.jpg', width: 1024, height: 682, alt: 'Aerial view of a neighborhood around a lake and golf course, with mountains beyond.' },
  { id: 'gallery-02', src: '/images/gallery-02.jpg', width: 1024, height: 682, alt: 'Sunroom with a red armchair and large windows looking onto a desert garden.' },
  { id: 'gallery-03', src: '/images/gallery-03.jpg', width: 1024, height: 682, alt: 'Aerial view of a single-story home and driveway against a mountain backdrop.' },
  { id: 'gallery-04', src: '/images/gallery-04.jpg', width: 1024, height: 682, alt: 'Aerial view of a tiled-roof home with a backyard pool and surrounding desert.' },
  { id: 'gallery-05', src: '/images/gallery-05.jpg', width: 1024, height: 682, alt: 'Community recreation grounds with sports courts and a roundabout below the mountains.' },
  { id: 'gallery-06', src: '/images/gallery-06.jpg', width: 1024, height: 683, alt: 'Aerial view of blue and green sports courts beside community buildings.' },
  { id: 'gallery-07', src: '/images/gallery-07.jpg', width: 1024, height: 683, alt: 'Single-story homes bordering a golf course and pond in the desert valley.' },
]
