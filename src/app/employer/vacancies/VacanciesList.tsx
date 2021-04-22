import { Item, Segment } from "semantic-ui-react"
import { Vacancy } from "../../models/Vacancy"

interface Props {
    vacancies: Vacancy[];
    handleSelectVacancy: (id: string) => void;
}

export default function VacanciesList({vacancies, handleSelectVacancy}: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {vacancies.map((vacancy: Vacancy, index: number) => {
                    return <Item key={index}>
                        <Item.Image size="tiny" src={`../../assets/${vacancy.position}.png`} />
                         <Item.Content>
                            <Item.Header as="a" onClick={() => handleSelectVacancy(vacancy.id)}>{vacancy.position}</Item.Header>
                            <Item.Description>
                                <div>{vacancy.scheduleDays}</div>
                                <div>{vacancy.scheduleShifts}</div>
                                <div>{vacancy.quantity}</div>
                                <div>{vacancy.comment}</div>
                            </Item.Description>
                        </Item.Content>
                    </Item>
                })}
        </Item.Group>
      </Segment>
    )
}
