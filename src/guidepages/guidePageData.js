const guidePageData = {
  schedule: {
    title: 'How to Schedule an Appointment',
    accent: '#6a9bc3',
    symbol: 1,
    searchDescription: 'Help with making a new appointment or booking a visit.',
    searchKeywords: ['schedule', 'appointment', 'visit', 'book appointment', 'book visit', 'new appointment', 'doctor appointment'],
    steps: [
      'If Schedule Appointment is not on the home screen, click Menu first.',
      'Click Appointments or Visits.',
      'Click Schedule an Appointment.',
      'Select the visit type.',
      'Choose your provider.',
      'Pick the location if asked.',
      'Choose a date and time.',
      'Review the details.',
      'Click Schedule or Confirm.'
    ],
    details: {
      1: 'If the portal does not show appointments right away, open the menu icon with three lines to find more options.',
      2: 'Look for Appointments or Visits. Some systems use slightly different names for the same section.',
      3: 'Choose Schedule an Appointment to start booking a new visit.',
      4: 'Pick the kind of visit you need, such as office visit, follow-up, annual exam, or video visit.',
      5: 'Choose the doctor you want, or select First Available if you want the soonest opening.',
      6: 'If the office has more than one location, choose the one that works best for you.',
      7: 'Pick the day and time that fits your schedule.',
      8: 'Double-check the provider, office, visit type, date, and time before finishing.',
      9: 'Press Schedule or Confirm and wait for the success message before leaving the page.',
      other: 'If your portal looks different, use the question box at the top or call the office from the phone book.'
    }
  },
  results: {
    title: 'How to View Test Results',
    accent: '#5a9e5a',
    symbol: 2,
    searchDescription: 'Help finding lab work, test results, and doctor notes.',
    searchKeywords: ['test results', 'results', 'labs', 'lab', 'blood work', 'bloodwork', 'report', 'doctor notes'],
    steps: [
      'Log in to your portal.',
      'Open Test Results or Health Record.',
      'Choose the result you want to read.',
      'Check the test date.',
      'Read the summary carefully.',
      'Look for notes from the doctor.',
      'Save or print the result if needed.',
      'Write down questions you have.',
      'Contact your provider if anything is unclear.'
    ],
    details: {
      1: 'Start by signing into the patient portal with your account information.',
      2: 'Look for a section named Test Results, Labs, or Health Record.',
      3: 'Open the result that matches the test you want to review.',
      4: 'Make sure you are reading the correct test by checking the date.',
      5: 'Read the summary first so you understand the main result before the numbers.',
      6: 'Many results include comments from your doctor or care team. Look for those notes.',
      7: 'If you need a copy, save it as a PDF or print it.',
      8: 'Write down anything that worries you so you can ask about it later.',
      9: 'Send a message or call the office if you do not understand the result.',
      other: 'If you cannot find your result, try searching recent visits or contact your care team for help.'
    }
  },
  meds: {
    title: 'How to View Medications',
    accent: '#c8c84a',
    symbol: 3,
    searchDescription: 'Help with medicines, prescriptions, pharmacies, and refills.',
    searchKeywords: ['medications', 'medicine', 'prescription', 'refill', 'refills', 'pharmacy', 'dosage', 'medicine list'],
    steps: [
      'Log in to your portal.',
      'Open the Medications section.',
      'Find the medicine you want.',
      'Read the dosage instructions.',
      'Check refill information.',
      'Look at the pharmacy listed.',
      'Request a refill if needed.',
      'Review the request.',
      'Wait for confirmation.'
    ],
    details: {
      1: 'Begin by signing in to your account.',
      2: 'Open Medications, Prescriptions, or My Medicines.',
      3: 'Find the medicine name in your current list.',
      4: 'Read how much to take and when to take it.',
      5: 'Check whether you have refills left.',
      6: 'Make sure the correct pharmacy is selected before sending a request.',
      7: 'Choose Request Refill if you need more medicine.',
      8: 'Review the medicine, pharmacy, and request details.',
      9: 'Wait for a confirmation message from the office or pharmacy.',
      other: 'If a medicine is missing from the list, call your doctor or pharmacy to verify your prescription.'
    }
  },
  billing: {
    title: 'How to View Billing',
    accent: '#c05050',
    symbol: 4,
    searchDescription: 'Help reviewing bills, balances, due dates, and payments.',
    searchKeywords: ['billing', 'bill', 'payment', 'pay', 'balance', 'statement', 'amount due', 'charges'],
    steps: [
      'Log in to your portal.',
      'Open Billing or Payments.',
      'Choose the bill you want to review.',
      'Read the amount due.',
      'Check the due date.',
      'Select a payment method if paying now.',
      'Enter payment details.',
      'Review your payment information.',
      'Submit payment or save the bill for later.'
    ],
    details: {
      1: 'Start by signing into the portal.',
      2: 'Open the Billing, Payments, or Statements section.',
      3: 'Choose the unpaid bill or statement you want to look at.',
      4: 'Find the total amount due on the page.',
      5: 'Check the due date so you know when payment is needed.',
      6: 'If you are paying now, choose your payment method.',
      7: 'Type in your card or payment information carefully.',
      8: 'Review everything before submitting.',
      9: 'Submit the payment or return later if you are not ready yet.',
      other: 'If you have questions about charges, contact the billing office before paying.'
    }
  },
  messages: {
    title: 'How to View Messages',
    accent: '#d4844a',
    symbol: 5,
    searchDescription: 'Help opening inbox messages and contacting your doctor.',
    searchKeywords: ['messages', 'message', 'inbox', 'doctor message', 'contact doctor', 'send message', 'reply'],
    steps: [
      'Log in to your portal.',
      'Open Messages or Inbox.',
      'Choose the message you want to read.',
      'Read the full message.',
      'Check if there is a reply button.',
      'Write a clear response if needed.',
      'Review your response.',
      'Send the message.',
      'Return later to check for new messages.'
    ],
    details: {
      1: 'Sign into your patient portal account.',
      2: 'Open the Messages, Inbox, or MyChart Messages section.',
      3: 'Select the message you want to read.',
      4: 'Read the full message before replying.',
      5: 'Some messages let you answer directly using a reply button.',
      6: 'Write your question or response clearly and briefly.',
      7: 'Check spelling and details before sending.',
      8: 'Press Send and wait for confirmation.',
      9: 'Come back later to see if the office answered.',
      other: 'For urgent health issues, do not wait for portal messages. Call the office or emergency services.'
    }
  },
  upcoming: {
    title: 'How to View Upcoming Appointments',
    accent: '#c060b0',
    symbol: 6,
    searchDescription: 'Help finding your next visit, appointment date, and location.',
    searchKeywords: ['upcoming appointment', 'next appointment', 'appointment date', 'future visit', 'reschedule', 'cancel appointment'],
    steps: [
      'Log in to your portal.',
      'Open Appointments or Visits.',
      'Choose Upcoming Appointments.',
      'Find the appointment you need.',
      'Check the date and time.',
      'Check the provider and location.',
      'Review visit instructions.',
      'Reschedule or cancel if needed.',
      'Save the information for later.'
    ],
    details: {
      1: 'Start by signing into your account.',
      2: 'Open the Appointments or Visits section.',
      3: 'Choose the tab or list for upcoming appointments.',
      4: 'Find the visit you want to review.',
      5: 'Confirm the correct date and time.',
      6: 'Check the doctor and office location listed.',
      7: 'Read any preparation notes or instructions.',
      8: 'Use the portal options if you need to reschedule or cancel.',
      9: 'Write down the details or save them so you do not forget.',
      other: 'If you do not see your visit listed, contact the office to confirm it was scheduled correctly.'
    }
  }
};

export default guidePageData;
