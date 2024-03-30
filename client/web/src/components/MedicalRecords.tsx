import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
function MedicalRecords() {
	const summary = localStorage.getItem("summary") || "No medical records found";
	const entities = localStorage.getItem("entities") || "No medical entities found";
	const entitiesArray = JSON.parse(entities);
	return (
		<div>
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>Check Your Medical History</AccordionTrigger>
					<AccordionContent>
						{
							summary
						}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>Check Your Medical Entities</AccordionTrigger>
					<AccordionContent>
						{
							entitiesArray.map((entity: any, idx: number) => (
								<div key={idx}>
									{entity.entity_group} - {entity.word}
								</div>))
						}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}

export default MedicalRecords;
