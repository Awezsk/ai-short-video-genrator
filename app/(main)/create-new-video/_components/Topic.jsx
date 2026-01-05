"use client"
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SparkleIcon } from 'lucide-react'
import axios from 'axios'
import { useAuthContext } from '@/app/provider'

const suggestions = [
    "Historic story",
    "Kids Story",
    "Movie Stories",
    "Ai innovation",
    "Space Mysteries",
    "Horror Stories",
    "Mythological Tales",
    "Tech Breakthrough",
    "True Crime Stories",
    "Fantasy Adventures",
    "Science Experiment",
    "Motivational Stories",
]

function Topic({ onHandleInputChange }) {
    const [selectedTopic, setSelectedTopic] = useState();
    const [selectedScriptIndex,setSelectedScriptIndex] =useState();
    const [scripts, setScripts]=useState();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const {user} =useAuthContext();

    const GenerateScript = async () => {

        if(user?.credits<=0)
        {
            toast('Please add more credits!')
        }
        if (!selectedTopic) {
            setError('Please select or enter a topic first')
            return
        }

        setLoading(true)
        setSelectedScriptIndex(null);
        setError(null)

        try {
            const result = await axios.post('/api/generate-script', {
                topic: selectedTopic
            })
            console.log('Script generated:', result.data);
            setScripts(result.data?.scripts);
            
            if (onHandleInputChange && result.data) {
                onHandleInputChange('script', result.data)
            }
        } catch (err) {
            console.error('Error generating script:', err)
            
            // Detailed error logging
            if (err.response) {
                // Server responded with error
                console.error('Response data:', err.response.data)
                console.error('Response status:', err.response.status)
                setError(err.response.data?.error || `Server error: ${err.response.status}`)
            } else if (err.request) {
                // Request made but no response
                console.error('No response received:', err.request)
                setError('No response from server. Please check your connection.')
            } else {
                // Something else happened
                console.error('Error message:', err.message)
                setError(err.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h2 className='mb-1'>Project title</h2>
            <Input 
                placeholder='Enter project Title' 
                onChange={(event) => onHandleInputChange('title', event?.target.value)} 
            />
            
            <div className='mt-5'>
                <h2>Video Topic</h2>
                <p className='text-sm text-gray-600'>Select topic for your video</p>

                <Tabs defaultValue="suggestion" className="w-full mt-2">
                    <TabsList>
                        <TabsTrigger value="suggestion">Suggestions</TabsTrigger>
                        <TabsTrigger value="your_topic">Your Topic</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="suggestion">
                        <div>
                            {suggestions.map((suggestion, index) => (
                                <Button 
                                    variant="outline" 
                                    key={index} 
                                    className={`m-1 ${suggestion === selectedTopic && 'bg-accent'}`} 
                                    onClick={() => {
                                        setSelectedTopic(suggestion)
                                        onHandleInputChange('topic', suggestion)
                                        setError(null)
                                    }}
                                >
                                    {suggestion}
                                </Button>
                            ))}
                        </div>
                    </TabsContent>
                    
                    <TabsContent value="your_topic">
                        <div>
                            <h2>Enter your Own Topic</h2>
                            <Textarea 
                                placeholder="Enter Your topic"
                                onChange={(event) => {
                                    setSelectedTopic(event.target.value)
                                    onHandleInputChange('topic', event.target.value)
                                    setError(null)
                                }}
                            />
                        </div>
                    </TabsContent>
                </Tabs>

                {scripts?.length>0&& 
                <div className='mt-3'>
                    <h2>Select the Script</h2>
                <div className='grid grid-cols-2 gap-5 mt-1'>
                    {scripts?.map((item,index)=>(
                        <div key={index} 
                        className={`p-3 border rounded-lg cursor-pointer
                        ${selectedScriptIndex==index&&'border-white bg-secondary'}
                        `}
                        onClick={()=> {setSelectedScriptIndex(index);
                            onHandleInputChange('script',item?.content)
                        }}
                        >
                            <h2 className='line-clamp-4 text-sm text-gray-300'>{item.content}</h2>
                        </div>
                    ))}
                </div>
                </div>
                }
            </div>

            {error && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                    {error}
                </div>
            )}

            {!scripts&& <Button 
                className='mt-3' 
                size="sm" 
                onClick={GenerateScript}
                disabled={loading || !selectedTopic}
            >
                <SparkleIcon className="mr-2" />
                {loading ? 'Generating...' : 'Generate script'}
            </Button>}
        </div>
    )
}

export default Topic
