import React, { useCallback, useState } from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, TextField } from '@mui/material'

import { User } from '../data/users'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'

export type CreatePostCardProps = {
  user: User

  onUserPost: (postText: string) => void
}

const cardStyle: SxProps<Theme> = {
  margin: '10px',
}

const inputStyle: SxProps<Theme> = {
  width: '100%',
}

export const CreatePostCard = ({user, onUserPost}: CreatePostCardProps) => {
  const {displayName, username, avatar} = user

  const [postText, setPostText] = useState('')

  const handleTextChange =
    useCallback((event: React.ChangeEvent<HTMLInputElement>) => setPostText(event.target.value), [setPostText])

  const handleSendPost = useCallback(() => {
    onUserPost(postText)
    setPostText('')
  }, [onUserPost, postText, setPostText])

  const handleKeyPress =
    useCallback((event: React.KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && !event.shiftKey && setTimeout(handleSendPost), [handleSendPost])

  return (
    <Card sx={cardStyle}>
      <CardHeader
        avatar={<Avatar src={avatar}/>}
        title={displayName}
        subheader={`@${username}`}
      />

      <CardContent>
        <TextField
          id="outlined-multiline-static"
          label="What's happening?"
          multiline
          rows={2}
          onChange={handleTextChange}
          value={postText}
          sx={inputStyle}
          onKeyPress={handleKeyPress}
        />
      </CardContent>


      <CardActions>
        <Button size="medium" onClick={handleSendPost}>Post it!</Button>
      </CardActions>
    </Card>
  )
}