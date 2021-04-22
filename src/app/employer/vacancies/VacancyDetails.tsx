import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { Vacancy } from '../../models/Vacancy'

interface Props {
    vacancy: Vacancy;
    handleCancelSelection: () => void;
}

export default function VacancyDetails({vacancy, handleCancelSelection} : Props) {
    return (
        <Card>
            <Card.Content>
                <Image size="tiny" src={`../../assets/${vacancy.position}.png`} />
                <Card.Header>
                    {vacancy.position}
                </Card.Header>
                <Card.Meta>
                    { vacancy.isClosed 
                        ? `closed ${vacancy.closedTimestamp}` 
                        : `published ${vacancy.publishedTimestamp}` }
                </Card.Meta>
                <Card.Description>{vacancy.comment}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button basic color='grey' onClick={handleCancelSelection}>
                    Back to list
                </Button>
            </Card.Content>
        </Card>
    )
}