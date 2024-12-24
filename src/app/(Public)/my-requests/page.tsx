"use client"

import { fetchMyRequests } from "@/api";
import { Button, Text } from "@/components"
import { IRequest } from "@/types";
import { capitalize } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react"

export default function MyRequests() {

    const { data, isFetching } = useQuery({
        queryKey: ["my-requests"],
        queryFn: fetchMyRequests,
    });

    const [modal, setModal] = useState<{isOpen: boolean; request: IRequest | null}>({ isOpen: false, request: null })

    return (
        <div className="grid grid-cols-[1fr,2fr] gap-10 mt-10 overflow-hidden">
            {isFetching ? <>Loading..</> : <ul className="border p-4 space-y-4 overflow-y-auto max-h-[90vh] h-max">
                {data?.map((request, index) => <li key={index}>
                    <button onClick={() => setModal({ request, isOpen: true })} className="w-full h-full text-left border p-2 flex justify-between items-center">
                        <div className="space-y-2 flex-grow">
                            <Text value={capitalize(request.title)} variant="h4" />
                            <Text value={capitalize(request.associatedSkill)} variant="p2" />
                        </div>
                        <div className="min-h-14 w-20 bg-gray-100" />
                    </button>
                </li>)}
            </ul>}
            {modal.isOpen && modal.request && <div className="border p-4 h-max space-y-6 overflow-y-auto max-h-[90vh]">
                <Text value={capitalize(modal.request.title)} variant="h2" />
                <Text value={`- ${capitalize(modal.request.associatedSkill)}`} variant="p" />
                <Text value={capitalize(modal.request.description)} variant="p2" />
                <div className="!mt-20 space-y-4"><Text value="Offers Received" variant="h4" className="font-semibold" />
                <div className="flex flex-wrap items-center gap-4">
                    <span className="border p-3 flex items-center space-x-4">
                        <Text value="James Bond" />
                        <Button text="View" size="xsmall" />
                    </span>
                </div>
                </div>
            </div>}
        </div>
    )
}
