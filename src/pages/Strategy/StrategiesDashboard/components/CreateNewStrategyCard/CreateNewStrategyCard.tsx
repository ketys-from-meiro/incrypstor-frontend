import React from "react"
import styles from "./CreateNewStrategyCard.module.scss"
import Card from "components/Card/Card"
import Button from "components/Button/Button"
import investImg from "./invest.png"
import { useNavigate } from "react-router-dom"

function CreateNewStrategyCard() {
    const navigate = useNavigate()

    return (
        <Card
            className={styles.createNewStrategyCard}
            onClick={() => navigate("/strategies/create")}
        >
            <img src={investImg} alt="" />
            <Button color="primary" className={styles.createBtn}>
                Create new strategy
            </Button>
        </Card>
    )
}

export default CreateNewStrategyCard
