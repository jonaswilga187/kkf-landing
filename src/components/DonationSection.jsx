export function DonationSection({ donationPurpose }) {
  if (!donationPurpose?.trim()) return null

  return (
    <p className="donation-note">
      <span className="donation-note__icon" aria-hidden="true">
        💛
      </span>
      {donationPurpose}
    </p>
  )
}
