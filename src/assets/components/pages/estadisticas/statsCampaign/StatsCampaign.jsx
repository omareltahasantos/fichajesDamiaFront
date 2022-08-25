import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'

export function StatsCampaign() {
    const { id } = useParams()
    return <div>StatsCampaign {id}</div>
}
