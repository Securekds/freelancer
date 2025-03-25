import React from "react";

const SkeletonLoading = () => {
  return (
    <div
    style={{
        width: "96%",
        height: "auto",
        marginTop: "50px",
        borderRadius: "0.75rem",
        backgroundClip: "border-box",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: "0 solid rgba(0, 0, 0, 0.125)",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        padding: '10px',
        gap: '10px',
    }}
    >
      {/* Project Title Skeleton */}
      <div className="ProjectTitel">
        <div
          style={{
            width: "60%",
            height: "32px",
            background: "linear-gradient(to right, #5B42F3, #00DDEB)",
            borderRadius: "4px",
            margin: "0 auto",
            animation: "pulse 1.5s infinite",
          }}
        />
      </div>

      {/* Underline Skeleton */}
      <div
        className="UnderLine"
        style={{
          width: "80%",
          height: "1px",
          background: "#ccc",
          margin: "10px auto",
        }}
      />

      {/* Info Container Skeleton */}
      <div
        className="InfoContainer"
        style={{
          display: "flex",
          width: "100%",
          gap: "10px",
          flexDirection: "column",
        }}
      >
        {/* Client Info Skeleton */}
        <div
          className="ClientInfo"
          style={{
            height: "auto",
            width: "100%",
            background: "rgba(0, 0, 0, 0.2)",
            borderRadius: "0.75rem",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            padding: "20px",
            position: "relative",
          }}
        >
          {/* Cover Skeleton */}
          <div
            style={{
              width: "100%",
              height: "100px",
              background: "#333",
              borderRadius: "0.75rem 0.75rem 0 0",
              marginBottom: "60px",
              animation: "pulse 1.5s infinite",
            }}
          />

          {/* Profile Circle Skeleton */}
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background: "#555",
              position: "absolute",
              bottom: "-30%",
              left: "50%",
              transform: "translateX(-50%)",
              animation: "pulse 1.5s infinite",
            }}
          />

          {/* Client Name Skeleton */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "20px",
                background: "#444",
                borderRadius: "4px",
                animation: "pulse 1.5s infinite",
              }}
            />
            <div
              style={{
                width: "80px",
                height: "16px",
                background: "#444",
                borderRadius: "4px",
                animation: "pulse 1.5s infinite",
              }}
            />
          </div>

          {/* Join Data Skeleton */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  background: "#333",
                  borderRadius: "16px",
                  animation: "pulse 1.5s infinite",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "#555",
                      borderRadius: "50%",
                    }}
                  />
                  <div
                    style={{
                      width: "100px",
                      height: "16px",
                      background: "#444",
                      borderRadius: "4px",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "60px",
                    height: "32px",
                    background: "#555",
                    borderRadius: "16px",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Project Status Skeleton */}
        <div
          className="ProjectStatus"
          style={{
            height: "auto",
            width: "100%",
            background: "rgba(0, 0, 0, 0.2)",
            borderRadius: "0.75rem",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            padding: "20px",
            position: "relative",
          }}
        >
          {/* Status Typo Skeleton */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "20px",
                background: "#444",
                borderRadius: "4px",
                animation: "pulse 1.5s infinite",
              }}
            />
            <div
              style={{
                width: "80px",
                height: "16px",
                background: "#444",
                borderRadius: "4px",
                animation: "pulse 1.5s infinite",
              }}
            />
          </div>

          {/* Data Project Skeleton */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  background: "#333",
                  borderRadius: "16px",
                  animation: "pulse 1.5s infinite",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "#555",
                      borderRadius: "50%",
                    }}
                  />
                  <div
                    style={{
                      width: "100px",
                      height: "16px",
                      background: "#444",
                      borderRadius: "4px",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "60px",
                    height: "32px",
                    background: "#555",
                    borderRadius: "16px",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Context Skeleton */}
      <div
        className="ProjectContext"
        style={{
          height: "auto",
          width: "100%",
          background: "rgba(0, 0, 0, 0.2)",
          borderRadius: "0.75rem",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "200px",
            background: "#333",
            borderRadius: "0.75rem",
            animation: "pulse 1.5s infinite",
          }}
        />
      </div>

      {/* Skills Needed Skeleton */}
      <div
        className="SkillsNeded"
        style={{
          height: "auto",
          width: "100%",
          background: "rgba(0, 0, 0, 0.2)",
          borderRadius: "0.75rem",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100px",
            background: "#333",
            borderRadius: "0.75rem",
            animation: "pulse 1.5s infinite",
          }}
        />
      </div>

      {/* Users Offers Skeleton */}
      <div
        className="UsersOffers"
        style={{
          height: "auto",
          width: "100%",
          background: "rgba(0, 0, 0, 0.2)",
          borderRadius: "0.75rem",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          padding: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100px",
            background: "#333",
            borderRadius: "0.75rem",
            animation: "pulse 1.5s infinite",
          }}
        />
      </div>
    </div>
  );
};

export default SkeletonLoading;