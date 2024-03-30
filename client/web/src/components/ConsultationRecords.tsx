import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

function ConsultationRecords() {
	const consultationRecords = localStorage.getItem("audio_mini_summary") || "No consultation records found";
	return (
		<div>
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>Check Your Consultation History</AccordionTrigger>
					<AccordionContent>
						{
							consultationRecords
						}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}

export default ConsultationRecords;
