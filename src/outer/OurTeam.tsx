// ===============================================================
// OUR TEAM — Accessible, Scalable, Mobile-Optimized (2025)
// ===============================================================

import { memo } from "react";
import styles from "./OurTeam.module.css";

// ===============================================================
// ✅ Local Images (Fallback Demo Data)
// ===============================================================
import pic1 from "../assets/team/Pharmacist.png";
import pic2 from "../assets/team/Pharmacologist.png";
import pic3 from "../assets/team/Technician.png";

// ===============================================================
// ✅ Type Definitions
// ===============================================================
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  qualification?: string;
  bio?: string;
  phone?: string;
  email?: string;
  imageSrc?: string;
}

interface Props {
  /** Optional external data source (e.g., fetched from backend) */
  members?: TeamMember[];
  /** Grid column count (1–4 recommended) */
  columns?: number;
}

// ===============================================================
// ✅ Default Demo Data (used when no props.members passed)
// ===============================================================
const defaultMembers: TeamMember[] = [
  {
    id: "1",
    name: "Dr. Jane Doe",
    role: "Chief Pharmacologist",
    qualification: "MBChB, PhD",
    bio: "Leads clinical pharmacy services and medication safety initiatives.",
    email: "jane.doe@example.com",
    imageSrc: pic1,
  },
  {
    id: "2",
    name: "Mr. John Smith",
    role: "Senior Clinical Pharmacist",
    qualification: "MPharm",
    bio: "Specialist in outpatient medication review and patient counselling.",
    email: "john.smith@example.com",
    imageSrc: pic2,
  },
  {
    id: "3",
    name: "Ms. Amina Patel",
    role: "Pharmacy Technician",
    qualification: "HND Pharmacy",
    bio: "Supports dispensing services and inventory management.",
    email: "amina.patel@example.com",
    imageSrc: pic3,
  },
];

// ===============================================================
// ✅ Component — Responsive, Semantic, ARIA-Compliant
// ===============================================================
function OurTeam({ members = defaultMembers, columns = 3 }: Props) {
  // Clamp grid columns safely between 1–4
  const cols = Math.min(Math.max(columns, 1), 4);

  return (
    <section className={styles.section} aria-labelledby="our-team-heading">
      {/* Header */}
      <header className={styles.header}>
        <h2 id="our-team-heading" className={styles.title}>
          Meet Our Team
        </h2>
        <p className={styles.subtitle}>
          Experienced pharmacy and clinical staff committed to safe, patient-centred care.
        </p>
      </header>

      {/* Team Members Grid */}
      <ul
        className={styles.grid}
        style={{ ["--cols" as any]: cols }}
        role="list"
      >
        {members.map((member) => (
          <li className={styles.card} key={member.id}>
            {/* === Image === */}
            <div className={styles.media}>
              <img
                src={member.imageSrc ?? "https://via.placeholder.com/320x320?text=Photo"}
                alt={`${member.name} — ${member.role}`}
                className={styles.avatar}
                loading="lazy"
                decoding="async"
                width={320}
                height={320}
              />
            </div>

            {/* === Text Content === */}
            <div className={styles.content}>
              <div className={styles.meta}>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
                {member.qualification && (
                  <p className={styles.qual}>{member.qualification}</p>
                )}
              </div>

              {member.bio && <p className={styles.bio}>{member.bio}</p>}

              {/* === Contact Info === */}
              {(member.email || member.phone) && (
                <div className={styles.contact}>
                  {member.email && (
                    <a
                      className={styles.contactLink}
                      href={`mailto:${member.email}`}
                      aria-label={`Email ${member.name}`}
                    >
                      {member.email}
                    </a>
                  )}
                  {member.phone && (
                    <a
                      className={styles.contactLink}
                      href={`tel:${member.phone}`}
                      aria-label={`Call ${member.name}`}
                    >
                      {member.phone}
                    </a>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* CTA Row */}
      <div className={styles.ctaRow}>
        <button
          type="button"
          className={styles.cta}
          aria-label="View all staff members"
        >
          View All Staff
        </button>
      </div>
    </section>
  );
}

// ===============================================================
// ✅ Export (Memoized for Performance)
// ===============================================================
export default memo(OurTeam);



