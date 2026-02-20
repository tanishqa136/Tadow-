import { useState, useEffect } from 'react'
import Paper from './components/Paper'
import LoadingAnimation from './components/LoadingAnimation'
import PasswordPanel from './components/PasswordPanel'

const papersData = [
  {
    id: 'p1',
    // className: 'heart',
    content: [{ text: 'I love you ❤️', color: '#C1121F' }]
  },
  {
    id: 'p2',
    content: [{ text: 'From your "Sid" ❤️', color: '#000000' }]
  },
  {
    id: 'p3',
    className: 'image',
    content: [
      { text: 'You will never know how much I miss you', color: '#f50057' },
      { text: 'Every moment feels empty without you ❤️‍🩹', color: '#ff1493' }
    ],
    image: '10.jpg'
  },
  {
    id: 'p4',
    content: [{ text: 'My Darling!! ❤️', color: 'hsl(311, 100%, 50%)' }]
  },
  {
    id: 'p5',
    content: [{ text: 'No one will ever love you more than I do ❤️', color: '#ff6347' }]
  },
  {
    id: 'p6',
    content: [{ text: 'But I promise,', color: '#00353d' }]
  },
  {
    id: 'p7',
    content: [{ text: 'Such a beauty and a beast combined,', color: '#ff4500' }]
  },
  {
    id: 'p8',
    content: [{ text: 'I know I don\'t deserve', color: '#ff6347' }]
  },
  {
    id: 'p9',
    className: 'image',
    content: [
      { text: 'And I fell in', color: '#f50057' },
      { text: 'Love with You 😍', color: '#ff1493' }
    ],
    image: '7.jpg'
  },
  {
    id: 'p10',
    className: 'image',
    content: [
      { text: 'Some', color: '#ff1493' },
      { text: 'Memories in chat ❤️', color: '#ff6347' }
    ],
    image: '9.jpg',
    imageHeight: '300px'
  },
  {
    id: 'p11',
    className: 'image',
    content: [
      { text: 'Some', color: '#ff1493' },
      { text: 'Memories in chat ❤️', color: '#ff6347' }
    ],
    image: '8.jpg'
  },
  {
    id: 'p12',
    className: 'image',
    content: [
      { text: 'Isn\'t she', color: '#ff1493' },
      { text: 'The cutest + hottest? ❤️', color: '#ff6347' }
    ],
    image: '6.jpg'
  },
  {
    id: 'p13',
    className: 'image',
    content: [{ text: 'Just look at that pretty smile', color: '#ff6347' }],
    image: '5.jpg'
  },
  {
    id: 'p14',
    className: 'image',
    content: [
      { text: 'She\'s the boss,', color: '#ff8c00' },
      { text: 'and she knows how to take charge of everything with elegance and confidence!', color: '#ff6347' }
    ],
    image: '4.jpg'
  },
  {
    id: 'p15',
    className: 'image',
    content: [
      { text: 'She\'s so dashing,', color: '#ff1493' },
      { text: 'yet so shy sometimes, which makes her even more adorable', color: '#ff6347' }
    ],
    image: '3.jpg'
  },
  {
    id: 'p16',
    className: 'image',
    content: [
      { text: 'I wonder', color: '#002b48' },
      { text: 'where she\'s looking at, maybe she\'s dreaming about the future with me!', color: '#005db4' }
    ],
    image: '2.jpg'
  },
  {
    id: 'p17',
    className: 'image',
    content: [
      { text: 'How can someone', color: '#ff1493' },
      { text: 'be so adorable and captivating in every way possible! 😍', color: '#f50057' }
    ],
    image: '1.jpg'
  },
  {
    id: 'p18',
    className: 'red',
    content: [
      { text: 'My Favorite', color: '#ff6347', className: 'p1' },
      { text: 'Person Ever ❤️', color: '#ff1493', className: 'p2' }
    ]
  },
  {
    id: 'p19',
    content: [
      { text: 'You are Cute,', color: '#ff8c00' },
      { text: 'Amazing ❤️', color: '#ff1493' }
    ]
  },
  {
    id: 'p20',
    content: [{ text: 'Drag the papers to move!', color: '#000000' }]
  }
]

function App() {
  const [isVerified, setIsVerified] = useState(false)
  const [accessDenied, setAccessDenied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(true)

  const handlePasswordSubmit = async (success) => {
    if (success) {
      setShowPassword(false)
      setIsLoading(true)
      // Wait for loading animation with delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsVerified(true)
      setIsLoading(false)
    } else {
      setAccessDenied(true)
      setShowPassword(false)
    }
  }

  if (showPassword) {
    return <PasswordPanel onSubmit={handlePasswordSubmit} />
  }

  if (accessDenied) {
    return <div className="access-denied">Access Denied!</div>
  }

  if (isLoading) {
    return <LoadingAnimation />
  }

  return (
    <div>
      <div className="background">
        <p className="tanishqaa-animate">Tanishqaa {'\u2764\uFE0F'}</p>
      </div>
      {papersData.map((paperData) => (
        <Paper key={paperData.id} data={paperData} />
      ))}
    </div>
  )
}

export default App



