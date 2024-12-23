"use client"

import { Button, Text } from "@/components"
import { useState } from "react"

export default function Home() {
    const REQUESTS = [{ title: "Help Request Title", subtitle: "Tags, Category, etc", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}]

    const [modal, setModal] = useState({isOpen: false, request: REQUESTS[0]})

    return (
        <div className="grid grid-cols-[1fr,2fr] gap-10 mt-10 overflow-hidden">
            <ul className="border p-4 space-y-4 overflow-y-auto max-h-[90vh] h-max">
                {[...REQUESTS, ...REQUESTS, ...REQUESTS, ...REQUESTS,].map((request, index) => <li key={index}>
                    <button onClick={() => setModal({request, isOpen: true})} className="w-full h-full text-left border p-2 flex justify-between items-center">
                        <div className="space-y-2 flex-grow">
                    <Text value={request.title} variant="h4" />
                    <Text value={request.subtitle} variant="p2" />
                        </div>
                        <div className="min-h-14 w-20 bg-gray-100"/>
                    </button>
                </li>)}
            </ul>
            {modal.isOpen && modal.request && <div className="border p-4 h-max space-y-6">
                <Text value={modal.request.title} variant="h2" />
                    <Text value={modal.request.subtitle} variant="p" />
                    <Text value={modal.request.description} variant="p2" />
                    <div className="!mt-20 flex justify-end"><Button text="Assist" size="small" /></div>
                    </div>}
        </div>
    )
}
