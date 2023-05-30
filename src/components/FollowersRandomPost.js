import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Post_Big_Card from '../screens/Cards/Post_Big_Card'

const FollowersRandomPost = () => {

    let data = [
        {
            id: 1,
            username: 'Ali',
            profile_image: 'https://i.pinimg.com/736x/b5/15/33/b51533e74b734cf2cfb7d9609a631800.jpg',
            image: "https://i.pinimg.com/236x/d8/fa/f4/d8faf4dd4471f7fae99568084bbcebe0.jpg",
            likes: [
                "sakshi_907",
                "Sagar Kumar"
            ],
            comments: [
                {
                    id: 1,
                    username: 'harshal_123',
                    comment: 'nice post'
                },
                {
                    id: 2,
                    username: 'viraj_123',
                    comment: 'Your look awesome'
                }
            ]
        },
        {
            id: 2,
            username: 'Mohan',
            profile_image: 'https://i.pinimg.com/736x/b5/15/33/b51533e74b734cf2cfb7d9609a631800.jpg',
            image: "https://i.pinimg.com/originals/4a/85/5d/4a855de8ec2fa7e6d546b858c566bc10.jpg",

            likes: [
                "Deepanjali"
            ],
            comments: [
                {
                    id: 1,
                    username: 'harshal_123',
                    comment: 'nice post'
                },
                {
                    id: 2,
                    username: 'viraj_123',
                    comment: 'positive attitude'
                }
            ]
        },
        {
            id: 3,
            username: 'rahul',
            profile_image: 'https://i.pinimg.com/736x/b5/15/33/b51533e74b734cf2cfb7d9609a631800.jpg',
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa9w_F4vb0-bkXrlPmrVqLGOZkd0yUxJmWnz6cCZwP44QZkB0GMm8Pv5tMWAS5HZdMYRY&usqp=CAU",
            likes: [
                "harshal",
                "Aarzoo"
            ],
            comments: [
                {
                    id: 1,
                    username: 'harshal_123',
                    comment: 'nice post'
                },
                {
                    id: 2,
                    username: 'viraj_123',
                    comment: 'Your look awesome'
                }
            ]
        },
        {
            id: 4,
            username: 'Prateek',
            profile_image: 'https://i.pinimg.com/736x/b5/15/33/b51533e74b734cf2cfb7d9609a631800.jpg',
            image: "https://i.pinimg.com/736x/e0/40/3c/e0403cbd47483850fffd2095f9ff5c7a.jpg",

            likes: [
                "sonam",
                "raju"
            ],
            comments: [
                {
                    id: 1,
                    username: 'harshal_123',
                    comment: 'nice post'
                },
                {
                    id: 2,
                    username: 'viraj_123',
                    comment: 'Your look awesome'
                }
            ]
        }
    ]

    // console.log(data[0].username)
    return (
        <ScrollView style={styles.container}>
            {
                data.map((item) => {
                    return (
                        <Post_Big_Card
                            key={item.id}
                            username={item.username}
                            profile_image={item.profile_image}
                            post_pic={item.image}
                            likes={item.likes}
                            comments={item.comments}
                        />
                    )
                })
            }
        </ScrollView>
    )
}

export default FollowersRandomPost

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
    }
})